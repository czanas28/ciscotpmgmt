module.exports = {
    name: 'cr309',
    customUi: `
    <Extensions>
    <Version>1.7</Version>
    <Panel>
    <Order>1</Order>
    <PanelId>panel_1</PanelId>
    <Type>Home</Type>
    <Icon>Handset</Icon>
    <Color>#07C1E4</Color>
    <Name>Panel</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>Quick Dial</Name>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>widget_1</WidgetId>
          <Name>Div S</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>widget_2</WidgetId>
          <Name>Shelter Hearings</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <Options>hideRowNames=1</Options>
    </Page>
    </Panel>
    </Extensions>
    `
}