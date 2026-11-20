export function AnswerFeedback({ correct, explanation }: { correct: boolean; explanation: string }) {
  return (
    <div
      role="status"
      className={`mt-4 rounded-lg border px-4 py-3 text-sm leading-6 ${
        correct
          ? "border-success/30 bg-success/10 text-success-text"
          : "border-warning/30 bg-warning/10 text-warning-text"
      }`}
    >
      <p className="font-semibold">{correct ? "Correct" : "Not quite"}</p>
      <p className="mt-1">{explanation}</p>
    </div>
  );
}
