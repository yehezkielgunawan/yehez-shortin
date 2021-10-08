import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
} from "@chakra-ui/popover";
import { Select } from "@chakra-ui/select";
import { AxiosError } from "axios";
import { FormikErrors, useFormik } from "formik";
import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa";

import { useAppToast } from "components/ui/AppToast";
import Main from "components/wrapper/Main";
import { submitUrl } from "functions/lib/fetcher";
import { LinkContent, LinkInput } from "functions/lib/types";
import { INITIAL_SUBMIT_LINK } from "types/submitForm";

const Index = () => {
  const [urlRes, setUrlRes] = useState<string>("");
  const toast = useAppToast();
  const {
    values,
    errors,
    touched,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik<LinkInput>({
    initialValues: INITIAL_SUBMIT_LINK,
    enableReinitialize: true,
    validate: (formValues) => {
      const error: FormikErrors<LinkInput> = {};
      if (formValues.url === "" || !formValues.url) {
        error.url = "Field URL must be filled!";
      }
      return error;
    },
    onSubmit: async (formValues) => {
      await submitUrl(formValues.url, formValues.domain, formValues.alias)
        .then((res: LinkContent) => {
          toast({
            status: "success",
            title: "Link has shortened successfully!",
          });
          setUrlRes(res.tiny_url);
        })
        .catch((err: AxiosError) => {
          toast({
            status: "error",
            title: err.message,
          });
        });
    },
  });

  const { url, domain, alias } = values;

  const handleSelectDomain = (
    selected: React.ChangeEvent<HTMLSelectElement>
  ) => {
    return setFieldValue("domain", selected.target.value);
  };

  const copyToClipboard = (text: string) => {
    return navigator.clipboard.writeText(text);
  };

  const resetThisForm = () => {
    setUrlRes("");
    resetForm();
  };

  const isSubmitButtonDisabled =
    !dirty || (dirty && Object.keys(errors).length > 0);

  return (
    <Main>
      <FormControl isRequired>
        <FormLabel htmlFor="url">Long URL</FormLabel>
        <Input
          value={url}
          name="url"
          id="name"
          placeholder="url"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Text color="red" size="xs">
          {touched.url && errors.url}
        </Text>
      </FormControl>
      <Flex gridGap={4} align="center">
        <FormControl>
          <FormLabel htmlFor="domain">Select Domain</FormLabel>
          <Select value={domain} onChange={handleSelectDomain}>
            <option value="tiny.one">tiny.one</option>
            <option value="tinyurl.com">tinyurl.com</option>
            <option value="yehez.tiny.us">yehez.tiny.us</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="alias">Alias</FormLabel>
          <Input
            value={alias}
            name="alias"
            id="alias"
            placeholder="alias"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControl>
      </Flex>
      <Flex gridGap={4} align="center">
        <Button
          w="100%"
          colorScheme="teal"
          onClick={() => handleSubmit()}
          isDisabled={isSubmitButtonDisabled}
        >
          Submit
        </Button>
        <Button colorScheme="yellow" w="100%" onClick={() => resetThisForm()}>
          Reset Form
        </Button>
      </Flex>
      {urlRes?.length > 0 && (
        <Text>
          Your new link: <b>{urlRes}</b>{" "}
          <Popover trigger="click">
            <PopoverTrigger>
              <IconButton
                aria-label="Clipboard"
                icon={<FaClipboard />}
                onClick={() => copyToClipboard(urlRes)}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Copied!</PopoverHeader>
            </PopoverContent>
          </Popover>
        </Text>
      )}
    </Main>
  );
};

export default Index;
