import { useEffect, useRef, useState } from "react";

export default function useDraggableScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if(!container) return;

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault(); // To avoid text selection
            setIsDragging(true);
            setStartX(e.pageX - container.offsetLeft)
            setScrollLeft(container.scrollLeft)
        }
        
        const handleMouseUp = () => {
            setIsDragging(false);
        }

        const handleMouseMove = (e: MouseEvent) => {
            if(!isDragging) return;
            e.preventDefault();  // To avoid text selection
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1; // Drag speed multiplier
            container.scrollLeft = scrollLeft - walk;
        }

        container.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isDragging, startX, scrollLeft])

    return containerRef
}
