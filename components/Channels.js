import { Text } from "@asyncapi/generator-react-sdk";

import { Header } from "./common";
import { Message } from "./Message";
import { Schema } from "./Schema";

export function Channels({ asyncapi }) {
  const channels = Object.entries(asyncapi.channels()).map(([channelName, channel]) => (
    <Channel channelName={channelName} channel={channel} />
  ));

  return (
    <>
      <Header type={2}>
        Channels
      </Header>
      {channels}
    </>
  );
}

function Channel({ channelName, channel }) {
  return (
    <Text>
      <Header type={3}>
        {`**${channelName}** Channel`}
      </Header>
      {channel.hasDescription() && (
        <Text newLines={2}>
          {channel.description()}
        </Text>
      )}
      {channel.hasParameters() && (
        <Parameters parameters={channel.parameters()} />
      )}
      {channel.operations().forEach(op => {<Operation operation={op} />})}
    </Text>
  );
}

function Parameters({ parameters }) {
  return (
    <Text>
      <Header type={4}>Channel Parameters</Header>
      {parameters.forEach(param => {
        <Schema schema={param.schema()} schemaName={param.name()} description={param.description()} hideTitle={true} />
      })}
    </Text>
  );
}

function Operation({ operation }) {
  const type = operation.isPublish() ? 'publish' : 'subscribe';
  return (
    <Text>
      <Header type={4}>{`\`${type}\` Operation`}</Header>
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
        <Message title='Message' message={operation.message(0)} />
      )}
    </Text>
  );
}
