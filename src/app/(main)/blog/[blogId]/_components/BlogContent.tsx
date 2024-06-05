"use client"
import SectionContainer from '@/components/containers/SectionContainer'
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import Image from 'next/image';
import { BlogWithAuthor } from '@/lib/types';
import { cn } from '@/lib/utils';

const sanitizeHtml = (htmlString: string) => {
    return DOMPurify.sanitize(htmlString);
};

const htmlToReact = (html: string) => {
    return parse(html, {
        replace(domNode) {
            if (domNode.type === 'tag' && domNode.name === 'img') {
                const { src, alt, ...rest } = domNode.attribs
                return <Image width={800} height={800} src={src} alt={alt} {...rest} priority />
            }
        },
    })
}

const BlogContent = ({ blog }: { blog: BlogWithAuthor }) => {

    const blogContent = htmlToReact(sanitizeHtml(blog.content));

    return (
        <main>
            <SectionContainer>
                <div className={cn('space-y-3',
                    'prose-headings:font-semibold prose-h1:mb-4 prose-h1:text-4xl prose-h3:text-2xl prose-p:mb-6 prose-p:text-sm prose-img:mx-auto prose-img:my-4 prose-img:aspect-video prose-img:h-auto prose-img:w-[700px] prose-img:rounded prose-img:object-cover prose-img:object-bottom sm:prose-h1:text-6xl sm:prose-h3:text-2xl sm:prose-p:text-base'
                )}>
                    {blogContent}
                </div>
            </SectionContainer>
        </main>
    )
}

export default BlogContent