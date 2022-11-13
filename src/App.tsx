import React, { MutableRefObject, RefObject, useEffect, useRef } from 'react';
import CanvasRenderer from './CanvasRenderer';

function App () {
    const canvasParentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const renderer: MutableRefObject<CanvasRenderer | null> = useRef<CanvasRenderer | null>(null);

    useEffect(() => {
        renderer.current = CanvasRenderer.create(canvasParentRef);
        renderer.current?.resize(1280, 720);

        return () => {
            renderer.current?.teardown();
        };
    }, []);

    return (
        <div className="App">
            <h1>Hello world.</h1>
            <div>
                <div ref={canvasParentRef}/>
            </div>
        </div>
    );
}

export default App;
