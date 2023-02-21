import {
  Button,
  Card,
  Label,
  Spinner,
  Textarea,
  Accordion,
  RangeSlider,
  TextInput,
  Select,
} from "flowbite-react";
import type { CodeReviewerFormValues } from "../types";
import { Formik, Form, Field } from "formik";

type CodeReviewerProps = {
  onSubmit: (values: CodeReviewerFormValues) => void;
  initialValues: CodeReviewerFormValues;
  isSubmiting: boolean;
  languages: string[];
  onReset: () => void;
};

const CodeReviewer = ({
  isSubmiting,
  onSubmit,
  initialValues,
  languages,
  onReset,
}: CodeReviewerProps) => {
  return (
    <Card>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        onReset={onReset}
      >
        {({ values }) => (
          <Form>
            <div id="textarea">
              <div className="mb-2 flex justify-between">
                <div className="flex min-h-full  place-items-end"></div>
                <Field as={Select} id="language" name="language">
                  {languages.map((v) => (
                    <option value={v} key={v}>
                      {v}
                    </option>
                  ))}
                </Field>
              </div>
              <Accordion alwaysOpen collapseAll className="mt-2">
                <Accordion.Panel>
                  <Accordion.Title>(Optional) Review Prompt</Accordion.Title>
                  <Accordion.Content>
                    <div className="mb-2 block">
                      <Label htmlFor="reviewPrompt" value="Review Prompt" />
                    </div>
                    <Field
                      as={TextInput}
                      id="reviewPrompt"
                      type="text"
                      placeholder="Evaluate the security of this code..."
                      required={false}
                      name="reviewPrompt"
                    />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
              <Field
                as={Textarea}
                id="comment"
                placeholder="Paste some code in here"
                required={true}
                autoFocus
                rows={16}
                name="content"
                className="mt-2"
              />

              <Accordion alwaysOpen collapseAll className="mt-2">
                <Accordion.Panel>
                  <Accordion.Title>Adjust Parameters</Accordion.Title>
                  <Accordion.Content>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="rounded-md p-2 outline outline-1 outline-gray-200 dark:text-gray-200 dark:outline-gray-600">
                        <div className="flex justify-between">
                          <label htmlFor="temperature">Temperature</label>
                          <span>{values.temperature}</span>
                        </div>
                        <Field
                          as={RangeSlider}
                          id="temperature"
                          name="temperature"
                          min={0}
                          max={1.0}
                          step={0.01}
                        />
                      </div>
                      <div className="w-full rounded-md p-2 outline outline-1 outline-gray-200 dark:text-gray-200 dark:outline-gray-600">
                        <label
                          htmlFor="numReviews"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Number of Reviews
                        </label>
                        <Field
                          as={TextInput}
                          type="number"
                          name="numReviews"
                          id="numReviews"
                          className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full     p-2.5 text-sm text-gray-900   dark:text-white dark:placeholder-gray-400"
                          min={1}
                          max={10}
                        />
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button
                  type="submit"
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
                  type="reset"
                >
                  Reset
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CodeReviewer;
