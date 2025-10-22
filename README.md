
PDF.js (often imported as pdfjs-dist) is an open-source JavaScript library used to parse PDF files and extract their contents, including text. It was created by Mozilla and is widely used for rendering PDFs in web browsers and accessing their structural data.

What is an ArrayBuffer?
It's a low-level, binary data buffer representing raw bytes of a file in memory. Unlike reading files as text or data URLs, this raw format contains all the binary content exactly as it exists in the PDF file.

Read the uploaded PDF as an ArrayBuffer because it preserves the file’s exact binary structure, which is required for correct PDF decoding and text extraction by pdfjs-dist.


FileReader reads file contents asynchronously is to prevent blocking the browser’s main thread, which keeps the user interface responsive.

When we upload and read a file (like a PDF), it can be large and take some time to load. If the file was read synchronously (blocking), the entire webpage would freeze until all bytes are read, leading to a poor user experience — no clicks, no animations, no input processing.

Instead, FileReader reads the file in the background without freezing the UI and triggers events (like onload) when the file reading finishes. This asynchronous behavior allows users to continue interacting with the page smoothly during the file read operation.
