import {
  Cards,
  Button,
  Link,
  Box,
  SpaceBetween,
  Header,
} from "@cloudscape-design/components";

export const TestPage = () => {
  return (
    <main>
      <SpaceBetween direction="horizontal" size="xs">
        <Button>Normal</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="link">Link</Button>
        <Button variant="icon" iconName="settings" />
        <Button iconName="calendar">Normal w Icon</Button>
      </SpaceBetween>
      <br />
      <Cards
        header={
          <>
            <Header>Example Cards</Header>
            <Link href="#">Link</Link>
          </>
        }
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          header: (item) => item.name,
          sections: [
            {
              id: "description",
              header: <Header variant="h3">Details</Header>,
              content: (item) => item.description,
            },
            {
              id: "type",
              header: <Header variant="h3">Type</Header>,
              content: (item) => item.type,
            },
            {
              id: "size",
              header: <Header variant="h3">Size</Header>,
              content: (item) => item.size,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
        items={[
          {
            name: "Card Item 1",
            alt: "First",
            description: "This is the first item",
            type: "1A",
            size: "Small",
          },
          {
            name: "Item 2",
            alt: "Second",
            description: "This is the second item",
            type: "1B",
            size: "Large",
          },
        ]}
        loadingText="Loading resources"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No resources</b>
              <Button>Create resource</Button>
            </SpaceBetween>
          </Box>
        }
      />
    </main>
  );
};
