import { Message, Icon } from 'semantic-ui-react'

export default (text) =>
  <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      { text || "I'm doing my shit..." }
    </Message.Content>
  </Message>
;