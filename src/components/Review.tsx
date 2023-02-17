import { Card, Spinner } from "flowbite-react";

type ReviewProps = {
  loading: boolean;
  review: string;
};
const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
  const { review, loading } = props;
  return (
    <Card className="mt-2">
      {loading ? (
        <div className=" text-center">
          <Spinner />
        </div>
      ) : (
        <p className="whitespace-pre-line">{review}</p>
      )}
    </Card>
  );
};
export default Review;
