<script lang="ts">
  import type { SidebarMenu } from "./link.interface";
	import { page } from '$app/stores';

  const MENU: SidebarMenu[] = [
    {items:[{ path: "dashboard" }]},
    { label: "General", items: [{ path: "perfil" }] },
    { label: "Administracion", items: [{ path: "clientes"},{ path: "facturas"},{ path: "recibos"}] },
    { label: "Configuracion", items: [{ path: "configuracion"}] },
  ];


  $:console.log($page.path === "/"+'clientes');
</script>

<nav class="menu">
  {#each MENU as menu (menu)}
    {#if menu.label}
      <p class="menu-label">{menu.label}</p>
    {/if}
    <ul class="menu-list">
      {#each menu.items as {path} (path)}
			  <li><a class:is-active={$page.path === "/"+path} sveltekit:prefetch href="/{path}">{path.charAt(0).toUpperCase() + path.slice(1)}</a></li>
      {/each}
    </ul>
  {/each}
</nav>

<style>
  nav.menu {
    height: 100%;
    background-color: #faffd8;
    padding: 1.5rem;
  }
  .menu-list a{
    transition: background-color 250ms ease;
  }

  .menu-list a.is-active {
	  background-color: #9AA899;
    transition: background-color 250ms ease;
	  color: #fff;
  }
</style>
