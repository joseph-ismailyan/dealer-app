<script>
    import { loading } from '$lib/stores.js';
    let loadingValue = undefined;

    loading.subscribe(value => {
      loadingValue = value;
    });

    import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
    import Drawer, { AppContent, Content, Header, Subtitle, Scrim } from '@smui/drawer';
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    
    import IconButton from '@smui/icon-button';
    import LinearProgress from '@smui/linear-progress';
    
    let topAppBar;
    let open = false;
    let active = 'Inbox';
    
    function setActive(value) {
        active = value;
        open = false;
    }
</script>


<TopAppBar bind:this={topAppBar} variant="fixed" style="z-index: 10">
    <Row>
        <Section>
            <IconButton on:click={() => (open = !open)} class="material-icons">menu</IconButton>
            <Title>Dealer App</Title>
        </Section>
        <Section align="end" toolbar>
        <IconButton class="material-icons" aria-label="Download">file_download</IconButton >
        <IconButton class="material-icons" aria-label="Print this page">print</IconButton >
        <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton >
        </Section>
    </Row>
    {#if loadingValue === true}
      <LinearProgress indeterminate />
    {/if}
</TopAppBar>

<div class="drawer-container">
    <Drawer variant="modal" fixed={false} bind:open>
      <Header>
        <Title>Ford Motor Co.</Title>
        <Subtitle>1234 Main St.</Subtitle>
      </Header>
      <Content>
        <List>
          <Item
            href="/"
            on:click={() => setActive('Home')}
            activated={active === 'Home'}
          >
            <Graphic class="material-icons" aria-hidden="true">home</Graphic>
            <Text>Home</Text>
          </Item>
          <Item
            href="/vehicles"
            on:click={() => setActive('Vehicles')}
            activated={active === 'Vehicles'}
          >
            <Graphic class="material-icons" aria-hidden="true">directions_car</Graphic>
            <Text>Vehicles</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('Sent Mail')}
            activated={active === 'Sent Mail'}
          >
            <Graphic class="material-icons" aria-hidden="true">send</Graphic>
            <Text>Sent Mail</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('Drafts')}
            activated={active === 'Drafts'}
          >
            <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
            <Text>Drafts</Text>
          </Item>
   
          <Separator />
            <Subheader>Labels</Subheader>

          <Item
            href="javascript:void(0)"
            on:click={() => setActive('Family')}
            activated={active === 'Family'}
          >
            <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
            <Text>Family</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('Friends')}
            activated={active === 'Friends'}
          >
            <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
            <Text>Friends</Text>
          </Item>
          <Item
            href="javascript:void(0)"
            on:click={() => setActive('Work')}
            activated={active === 'Work'}
          >
            <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
            <Text>Work</Text>
          </Item>
        </List>
      </Content>
    </Drawer>
   
    <Scrim fixed={false} />
    <AppContent class="app-content" style="">
      <main class="main-content">
        <pre class="status">Active: {active}</pre>
        <AutoAdjust {topAppBar}>
            <main id="content">
                <slot></slot>
            </main>
        </AutoAdjust>
      </main>
    </AppContent>
  </div>

  
<style>
    /* Hide everything above this component. */
    :global(app),
    :global(body),
    :global(html) {
      display: block !important;
      height: calc(100% - var(--top-bar-height)) !important;
      width: 100% !important;
      position: static !important;
      margin: 0;
    }
    
    * :global(.app-content) {
        flex: auto;
        overflow: auto;
        position: relative;
        flex-grow: 1;
        height: calc(100vh - var(--top-bar-height));
    }

    #content {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column; 
        height: 100%
    }

    @media only screen and (max-width: 599px) {
      :root{
        --top-bar-height: 56px;
      }
    }

    @media only screen and (min-width: 599px) {
      :root{
        --top-bar-height: 64px;
      }
    }

    .drawer-container {
        border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
        height: 100vh;
        z-index: 0;
        padding-top: var(--top-bar-height);
    }
 
    .main-content {
        overflow: auto;
        padding: 16px;
        height: 100%;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
    }
</style>