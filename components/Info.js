import { Text } from "@asyncapi/generator-react-sdk";

import { Header, Link, Image } from "./common";

export function Info({ asyncapi, params }) {
  const info = asyncapi.info();
  return (
    <>
      <Header type={1}>
        {info.title()} {params.version || info.version()} documentation
      </Header>

      {info.description() && (
        <Text>
          {info.description()}
        </Text>
      )}

      {info.hasExtension('x-logo') && (
        <Text>
          <Image src={info.extension('x-logo')} desc={`${info.title()} logo`} />
        </Text>
      )}
    </>
  );
}

export function TermsOfService({ asyncapi }) {
  const termsOfService = asyncapi.info().termsOfService();
  return termsOfService ? (
    <Text newLines={2}>
      <Header type={2}>
        Terms of service
      </Header>
      <Link href={termsOfService}>{termsOfService}</Link>
    </Text>
  ) : null;
}
