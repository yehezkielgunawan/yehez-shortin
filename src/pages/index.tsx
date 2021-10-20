import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { FormHelperText, Skeleton, useDisclosure } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { AxiosError } from "axios";
import { FormikErrors, useFormik } from "formik";
import React, { useState } from "react";

import AppModal from "@/components/ui/AppModal";
import { useAppToast } from "@/components/ui/AppToast";
import ClipboardPopover from "@/components/ui/ClipboardPopover";
import Main from "@/components/wrapper/Main";
import { useDesktopWidthCheck } from "@/functions/helpers/desktopWidthChecker";
import isValidURL from "@/functions/helpers/isValidURL";
import { submitUrl } from "@/functions/lib/fetcher";
import { LinkContent, LinkInput, LinkResponse } from "@/functions/lib/types";
import { INITIAL_SUBMIT_LINK } from "@/types/submitForm";

const Index = () => {
  const [urlRes, setUrlRes] = useState<string>("");
  const [isFail, setIsFail] = useState<boolean>(false);
  const toast = useAppToast();
  const isDesktopWidth = useDesktopWidthCheck();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalHeader = <Heading as="h5">Shortener Result</Heading>;

  const modalContent = !isFail ? (
    <Skeleton isLoaded={urlRes.length > 0}>
      <Flex justify="space-between" align="center">
        <Text>
          Your new link: <b>{urlRes}</b>
        </Text>
        <ClipboardPopover urlRes={urlRes} />
      </Flex>
    </Skeleton>
  ) : (
    <Text>
      Failed to shorten the URL. Try another <b>alias</b> or <b>domain</b>.
    </Text>
  );

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
      if (!isValidURL(formValues.url) && formValues.url.length > 0) {
        error.url = "It must be valid URL!";
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
          setIsFail(false);
          return setUrlRes(res.tiny_url);
        })
        .catch((err: AxiosError<LinkResponse>) => {
          setIsFail(true);
          return err.response?.data.errors?.map((errorMessage) => {
            return toast({
              status: "error",
              title: errorMessage,
            });
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

  const resetThisForm = () => {
    setUrlRes("");
    setIsFail(false);
    resetForm();
  };

  const submitAndOpenModal = () => {
    handleSubmit();
    onOpen();
    setIsFail(false);
    setUrlRes("");
  };

  const isSubmitButtonDisabled =
    !dirty || (dirty && Object.keys(errors).length > 0);

  return (
    <Main>
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize={isDesktopWidth ? "3xl" : "xl"}
        fontWeight="extrabold"
        textAlign="center"
      >
        The URL is too long? Make it short!
      </Text>
      <FormControl isRequired>
        <FormLabel htmlFor="url">Long URL</FormLabel>
        <Input
          value={url}
          name="url"
          id="url"
          placeholder="url"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormHelperText color="red" size="xs">
          {touched.url && errors.url}
        </FormHelperText>
      </FormControl>

      <Flex gridGap={4} align="center">
        <FormControl>
          <FormLabel htmlFor="domain">Select Domain</FormLabel>
          <Select value={domain} onChange={handleSelectDomain}>
            <option value="yehez.tiny.us">yehez.tiny.us</option>
            <option value="tiny.one">tiny.one</option>
            <option value="tinyurl.com">tinyurl.com</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="alias">Alias</FormLabel>
          <Input
            value={alias}
            name="alias"
            id="alias"
            placeholder="alias (optional)"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControl>
      </Flex>
      <Flex gridGap={4} align="center">
        <Button
          w="100%"
          colorScheme="teal"
          onClick={() => submitAndOpenModal()}
          isDisabled={isSubmitButtonDisabled}
        >
          Submit
        </Button>
        <Button colorScheme="yellow" w="100%" onClick={() => resetThisForm()}>
          Reset Form
        </Button>
      </Flex>

      <AppModal
        isOpen={isOpen}
        size="md"
        header={modalHeader}
        withCloseButton={true}
        body={modalContent}
        onClose={onClose}
        withFooter
      />
    </Main>
  );
};

export default Index;
