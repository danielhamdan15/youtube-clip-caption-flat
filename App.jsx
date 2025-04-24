import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ClipCaptionTool() {
  const [videoUrl, setVideoUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [clipResult, setClipResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClipVideo = async () => {
    setLoading(true);
    try {
      const result = {
        videoUrl: videoUrl,
        startTime: startTime,
        endTime: endTime,
        captions: [
          { time: "00:00", text: "This is an example caption." },
          { time: "00:01", text: "This is another example caption." }
        ]
      };
      setClipResult(result);
    } catch (err) {
      console.error("Error processing video clip:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Clip & Caption Tool</h1>
      <Card className="mb-4">
        <CardContent className="space-y-2">
          <Input
            placeholder="YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Input
            placeholder="Start time (e.g., 00:30)"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            placeholder="End time (e.g., 01:00)"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <Button onClick={handleClipVideo} disabled={loading}>
            {loading ? "Processing..." : "Generate Clip with Captions"}
          </Button>
        </CardContent>
      </Card>

      {clipResult && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Clip Preview</h2>
            <p><strong>From:</strong> {clipResult.startTime} to {clipResult.endTime}</p>
            <p><strong>Captions:</strong></p>
            <ul className="list-disc pl-5">
              {clipResult.captions.map((cap, idx) => (
                <li key={idx}><strong>{cap.time}</strong>: {cap.text}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
