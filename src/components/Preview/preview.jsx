import { useEffect, useRef } from "react"

const Preview = ({ code }) => {
    const iframeRef = useRef(null)

    useEffect(() => {
        if (iframeRef.current) {
            const document = iframeRef.current.contentDocument;
            if (document) {
                document.open();
                document.write(code);
                document.close();
            }
        }
    }, [code]);

    return (
        <iframe
            ref={iframeRef}
            className="w-full h-64 border rounded-md"
        />
    )
}

export default Preview;