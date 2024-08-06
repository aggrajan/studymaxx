import React from 'react';

const PdfPreview = ({ pdfUrl } : { pdfUrl: string }) => {

    return (
        <iframe
            src={pdfUrl}
            allow="autoplay"
            className="w-full h-full"
        ></iframe>
    );
};

export default PdfPreview;
