import { describe, expect, test } from "@jest/globals";
import { createSchoolFormDefinition } from "@/composites/CreateSchoolForm/definition";

describe("create school form definition", () => {
  describe("school name", () => {
    test("non empty name is valid", () => {
      const schoolName = "Some name";
      const result =
        createSchoolFormDefinition.validators.name.isValid(schoolName);
      expect(result).toBeTruthy();
    });

    test("empty name is invalid", () => {
      const schoolName = "";
      const result =
        createSchoolFormDefinition.validators.name.isValid(schoolName);
      expect(result).toBeFalsy();
    });
  });

  describe("school description", () => {
    test("non empty description is valid", () => {
      const description = "Some name";
      const result =
        createSchoolFormDefinition.validators.description.isValid(description);
      expect(result).toBeTruthy();
    });

    test("empty description is invalid", () => {
      const description = "";
      const result =
        createSchoolFormDefinition.validators.description.isValid(description);
      expect(result).toBeFalsy();
    });
  });
});
