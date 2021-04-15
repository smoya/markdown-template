import { Text } from "@asyncapi/generator-react-sdk";

import { Header } from "./common";
import { Message } from "./Message";
import { Schema } from "./Schema";

export function Channels({ asyncapi }) {
  return (
    <>
      <Header type={2}>
        Channels
      </Header>
      {asyncapi.channels().map(channel => {return  <Channel channel={channel} />})}
    </>
  );
}

function Channel({ channel }) {
  return (
    <Text>
      <Header type={3}>
        {`**${channel.name()}** Channel`}
      </Header>
      {channel.hasDescription() && (
        <Text newLines={2}>
          {channel.description()}
        </Text>
      )}
      {channel.hasParameters() && (
        <Parameters parameters={channel.parameters()} />
      )}
      {channel.operations().map(op => {return <Operation operation={op} />})}
    </Text>
  );
}

function Parameters({ parameters }) {
  return (
    <Text>
      <Header type={4}>Channel Parameters</Header>
      {parameters.map(param => {
        return <Schema schema={param.schema()} schemaName={param.name()} description={param.description()} hideTitle={true} />
      })}
    </Text>
  );
}

function Operation({ operation }) {
  return (
    <Text>
      <Header type={4}>{`\`${operation.id()}\` (\`${operation.type()}\`) Operation`}</Header>
      {operation.summary() && (
        <Text newLines={2}>
          *{operation.summary()}*
        </Text>
      )}
      {operation.hasDescription() && (
        <Text newLines={2}>
          {operation.description()}
        </Text>
      )}
      {operation.hasMultipleMessages() ? (
        <>
          <Text newLines={2}>
            Accepts **one of** the following messages:
          </Text>
          {operation.messages().map(msg => (
            <Message title={`Message \`${msg.uid()}\``} message={msg} />
          ))}
        </>
      ) : (
        <Message title='Message' message={operation.messages[0]} />
      )}
    </Text>
  );
}
