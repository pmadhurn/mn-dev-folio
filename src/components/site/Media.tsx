import { media, type MediaKey } from '@/data/media';
import { cn } from '@/lib/utils';

interface MediaProps {
  name: MediaKey;
  /** `sizes` attribute — how wide the slot is at each breakpoint. */
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Override alt text, e.g. empty for purely decorative use. */
  alt?: string;
}

/**
 * Responsive image from the registry in src/data/media.ts. Renders a single
 * <img> with srcset/sizes and intrinsic dimensions so space is reserved
 * before the bytes arrive.
 */
const Media = ({ name, sizes = '100vw', priority = false, className, imgClassName, alt }: MediaProps) => {
  const asset = media[name];
  const largest = asset.widths[asset.widths.length - 1];
  const srcSet = asset.widths.map((w) => `/media/${asset.base}-${w}.webp ${w}w`).join(', ');

  return (
    <div className={cn('media-frame', className)}>
      <img
        src={`/media/${asset.base}-${largest}.webp`}
        srcSet={srcSet}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt ?? asset.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // React 18 doesn't know fetchPriority yet; pass it through lowercase.
        {...(priority ? { fetchpriority: 'high' } : {})}
        className={imgClassName}
      />
    </div>
  );
};

export default Media;
