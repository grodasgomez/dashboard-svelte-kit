<script lang="ts">
  import type { FieldFilter } from "../../components/table/table.interface";
  import ClientForm from "../../components/client/ClientForm.svelte"
  import Table from "../../components/table/Table.svelte"
  import TableFilter from "../../components/table/TableFilter.svelte"
  import { ClientModel, CLIENT_HEADER } from "../../components/client/model/cliente.model";

  let dataList: ClientModel[] = [
    {
      id: 1,
      denomination: "GUILLERMO RODAS GOMEZ",
      email: "grodasgomez@gmail.com",
      phoneNumber: "12345",
    },
    {
      id: 2,
      denomination: "GUILLERMO RODAS GOMEZ",
      email: "grodasgomez@gmail.com",
      phoneNumber: "12345",
    },
    {
      id: 3,
      denomination: "GUILLERMO RODAS GOMEZ",
      email: "grodasgomez@gmail.com",
      phoneNumber: "12345",
    },
    {
      id: 4,
      denomination: "GUILLERMO RODAS GOMEZ",
      email: "grodasgomez@gmail.com",
      phoneNumber: "12345",
    },
    {
      id: 5,
      denomination: "GUILLERMO RODAS GOMEZ",
      email: "grodasgomez@gmail.com",
      phoneNumber: "12345",
    },
  ];

  let tableHeaders = CLIENT_HEADER;
  let showModal = false;
  let id = 9;

  let filterParams: FieldFilter[] = [
    { label: "Nombre", name: "nombre" },
    { label: "Apellido", name: "apellido" },
    { label: "C.I.", name: "nroDocumento" },
  ];

  function handleCloseModal() {
    showModal = false;
  }

  function handleSubmit(event: CustomEvent) {
    const newClient = { id: id++, ...event.detail };

    dataList = [...dataList, newClient];
    handleCloseModal();
  }

  function handleDelete(event: CustomEvent) {
    alert(`Vamo a eliminar : ${event.detail}`);
  }

  function handleEdit(event: CustomEvent) {
    alert(`Vamo a editar : ${event.detail}`);
  }
</script>

<ClientForm
  on:closeModal={handleCloseModal}
  on:submit={handleSubmit}
  {showModal}
/>
<section class="card">
  <header class="card-header">
    <p class="card-header-title">Clientes</p>
  </header>
  <div class="card-content">
    <Table {dataList} {tableHeaders} on:delete={handleDelete} on:edit={handleEdit}>
      <TableFilter
        params={filterParams}
        on:filter={() => {
          console.log(filterParams);
        }}
        slot="table-filter"
      />
    </Table>
  </div>
  <footer class="card-footer">
    <button
      class="button is-info is-light"
      on:click={() => {
        showModal = true;
      }}>
      Nuevo Cliente
    </button>
  </footer>
</section>
