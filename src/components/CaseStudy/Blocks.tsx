import React from 'react';

import type { CaseStudyBlock } from '@/locale/types';

export default function Blocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p
                key={i}
                className='cs-item text-[15px] leading-relaxed text-primary-blue/75 md:text-[16px]'
              >
                {block.text}
              </p>
            );
          case 'h3':
            return (
              <h3
                key={i}
                className='cs-item font-unica pt-2 text-xl uppercase tracking-tight text-primary-blue'
              >
                {block.text}
              </h3>
            );
          case 'list':
            return (
              <ul key={i} className='flex flex-col gap-3'>
                {block.items.map((item) => (
                  <li
                    key={item}
                    className='cs-item relative pl-5 text-[15px] leading-relaxed text-primary-blue/75 before:absolute before:left-0 before:top-[0.8em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-raspberry md:text-[16px]'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <figure key={i} className='cs-item my-2'>
                <img
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  loading='lazy'
                  decoding='async'
                  className='block h-auto max-w-full border-2 border-raspberry/20 bg-primary-blue/3'
                />
                {block.caption && (
                  <figcaption className='mt-2 text-[13px] tracking-wide text-primary-blue/50'>
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case 'code':
            return (
              <pre
                key={i}
                className='cs-item overflow-x-auto rounded-[3px] bg-primary-blue p-4 text-[13px] leading-relaxed text-white/90'
              >
                <code data-lang={block.lang}>{block.code}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
