// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button, Card, Label, Textarea } from "flowbite-react";

type CodeReviewerProps = {
  content: string;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
};
const CodeReviewer = (props: CodeReviewerProps) => {
  const { content, onChangeContent, onSubmit } = props;
  return (
    <Card>
      <div id="textarea">
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Your code" />
        </div>
        <Textarea
          id="comment"
          placeholder="Paste some code in here"
          required={true}
          value={content}
          onChange={onChangeContent}
          rows={4}
        />
        <Button onClick={onSubmit} className="mt-2">
          Submit for Review
        </Button>
      </div>
    </Card>
  );
};

export default CodeReviewer;
