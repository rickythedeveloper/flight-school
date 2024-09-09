"use client";

import type { ReactElement} from "react";
import { useMemo , useState, useCallback } from "react";
import { Form } from "@/components/Form";
import type { CreateSchoolFormValue } from "@/composites/CreateSchoolForm/definition";
import { createSchoolFormDefinition } from "@/composites/CreateSchoolForm/definition";
import { TextField } from "@/components/inputs/textInputs/TextField";
import { useForm } from "@/hooks/useForm";
import { createSchoolAction } from "@/serverActions/school/createSchoolAction";
import { FileInput } from "@/components/inputs/FileInput";
import { Carousel } from "@/components/Carousel";
import { Image } from "@/components/Image";

const schoolImageHeight = 200;

export const CreateSchoolForm = (): ReactElement => {
  const [images, setImages] = useState<File[]>([]);
  const imageUrls: string[] = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images],
  );

  const { formState, updateField, onSubmitPressed, errorState } = useForm(
    createSchoolFormDefinition,
  );

  const createSchool = useCallback((formValue: CreateSchoolFormValue) => {
    // TODO upload images
    void createSchoolAction(formValue);
    // TODO create school image entries
  }, []);

  return (
    <Form
      submitButtonTitle={"Create"}
      onSubmitPressed={() => onSubmitPressed(createSchool)}
    >
      <TextField
        label={"Name"}
        placeholder={"Enter school name"}
        value={formState.name}
        setValue={(newValue) => updateField("name", newValue)}
        error={errorState.name}
        required
      />
      <TextField
        label={"Description"}
        placeholder={"Enter school description"}
        value={formState.description}
        setValue={(newValue) => updateField("description", newValue)}
        error={errorState.description}
        required
      />
      <FileInput
        label={"Upload images"}
        placeholder={"Select images"}
        fileTypes={["image/png", "image/jpeg"]}
        multiple={true}
        value={images}
        setValue={setImages}
      />
      {imageUrls.length > 0 && (
        <Carousel
          height={schoolImageHeight}
          items={imageUrls.map((imageUrl, index) => ({
            node: (
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                height={schoolImageHeight}
              />
            ),
            key: `${index}-${imageUrl}`,
          }))}
        />
      )}
    </Form>
  );
};
