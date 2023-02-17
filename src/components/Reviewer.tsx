// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button, Card, Label, Spinner, Textarea } from "flowbite-react";

type CodeReviewerProps = {
  content: string;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isSubmiting: boolean;
  onReset: () => void;
};
const CodeReviewer = (props: CodeReviewerProps) => {
  const { content, onChangeContent, onSubmit, isSubmiting, onReset } = props;
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
          autoFocus
          rows={16}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            onClick={onSubmit}
            className="self-center align-middle"
            disabled={isSubmiting}
            gradientDuoTone="purpleToBlue"
          >
            {isSubmiting && (
              <div className="mr-3">
                <Spinner />
              </div>
            )}
            Submit for Review
          </Button>
          <Button
            outline
            gradientDuoTone="pinkToOrange"
            className="self-center align-middle"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CodeReviewer;
