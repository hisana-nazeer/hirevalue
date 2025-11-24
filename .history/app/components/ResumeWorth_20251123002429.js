const [result, setResult] = useState("");

useEffect(() => {
  async function fetchWorth() {
    if (!resume) return;

    const response = await fetch("/api/resume", {
      method: "POST",
      body: resume
    });

    const data = await response.text();   // <-- IMPORTANT
    console.log("Frontend received:", data);

    setResult(data);
  }

  fetchWorth();
}, [resume]);
