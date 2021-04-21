module.exports = {
    name: 'room55',
    customUi: 
    `
    <Extensions>
  <Version>1.7</Version>
  <Panel>
    <Order>1</Order>
    <PanelId>orjCallStatus</PanelId>
    <Origin>local</Origin>
    <Type>Statusbar</Type>
    <Icon>Help</Icon>
    <Color>#A866FF</Color>
    <Name>ORJ</Name>
    <ActivityType>Custom</ActivityType>
  </Panel>
  <Panel>
    <Order>2</Order>
    <PanelId>panel_1</PanelId>
    <Origin>local</Origin>
    <Type>Home</Type>
    <Icon>Handset</Icon>
    <Name>Quick Dial</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>Weekend Docket</Name>
      <Row>
        <Name/>
        <Widget>
          <WidgetId>widget_3</WidgetId>
          <Name>Tap to call a meeting room. The PIN will automatically enter itself once the call is established.</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=small;align=center</Options>
        </Widget>
        <Widget>
          <WidgetId>d78b2b07-40b5-4d6a-937f-f37fdcafb244</WidgetId>
          <Name>Shelter Hearings</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>284f96e8-0d3e-45ed-913b-210a759607f5</WidgetId>
          <Name>Juvenile Detentions</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <Options>hideRowNames=1</Options>
    </Page>
  </Panel>
  <Panel>
    <Order>3</Order>
    <PanelId>frjCallStatus</PanelId>
    <Origin>local</Origin>
    <Type>Statusbar</Type>
    <Icon>Help</Icon>
    <Color>#00D6A2</Color>
    <Name>FRJ</Name>
    <ActivityType>Custom</ActivityType>
  </Panel>
</Extensions>
`
}