import { Card, type CardProps, Spinner } from "flowbite-react";
import ReactMarkdown from "react-markdown";

type ReviewProps = {
  loading: boolean;
  review: string;
} & CardProps;
const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
  const { review, loading } = props;
  return (
    <Card className="mt-2">
      {loading ? (
        <div className=" text-center">
          <Spinner />
        </div>
      ) : (
        <ReactMarkdown className="overflow-x-auto  dark:text-gray-100">
          {review}
        </ReactMarkdown>
      )}
    </Card>
  );
};
export default Review;
