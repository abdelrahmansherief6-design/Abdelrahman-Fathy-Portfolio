import { PortfolioData } from './types';

/**
 * Compresses a base64 image string to fit within a specified maximum dimension
 * and file size, returning a highly-optimized JPEG base64 string.
 */
export const compressBase64 = (
  base64Str: string,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.75
): Promise<string> => {
  if (!base64Str || !base64Str.startsWith('data:image/') || base64Str.length < 100000) {
    return Promise.resolve(base64Str);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions to maintain aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64Str);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

/**
 * Traverses a PortfolioData object and optimizes all base64 images inside it
 * (avatar, project thumbnails, additional project images).
 */
export async function compressPortfolioImages(data: PortfolioData): Promise<PortfolioData> {
  const cloned = JSON.parse(JSON.stringify(data)) as PortfolioData;

  // Compress avatar (profile photo)
  if (cloned.profile.avatar) {
    cloned.profile.avatar = await compressBase64(cloned.profile.avatar, 500, 600, 0.75);
  }

  // Compress project images
  if (cloned.projects && cloned.projects.length > 0) {
    for (let i = 0; i < cloned.projects.length; i++) {
      const proj = cloned.projects[i];
      if (proj.image) {
        proj.image = await compressBase64(proj.image, 800, 600, 0.7);
      }
      if (proj.images && proj.images.length > 0) {
        for (let j = 0; j < proj.images.length; j++) {
          proj.images[j] = await compressBase64(proj.images[j], 800, 600, 0.7);
        }
      }
    }
  }

  return cloned;
}

/**
 * Simple deep merge utility
 */
export function deepMerge(target: any, source: any): any {
  if (!source) return target;
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
