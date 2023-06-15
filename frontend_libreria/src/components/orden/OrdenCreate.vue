<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const idProducto = ref('')
const idCliente = ref('')
const cantidad = ref('')
const totalventa = ref('')
const fechaemision = ref('')

async function crearOrden() {
  await http
    .post(ENDPOINT, { idProducto: idProducto.value, idCliente: idCliente.value, cantidad: cantidad.value, totalventa: totalventa.value, fechaemision: fechaemision.value   })
    .then(() => router.push('/Ordenes'))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/ordenes">Ordenes</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Ordenes de Ventas</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearOrden">

        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="idProducto" placeholder="IdProducto" required />
          <label for="idProducto">Id Producto</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="idCliente" placeholder="IdCliente" required />
          <label for="IdCliente">Id Cliente</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="cantidad"
            placeholder="Cantidad"
            required
          />
          <label for="cantidad">Cantidad</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="totalventa"
            placeholder="TotalVenta"
            required
          />
          <label for="totalventa">Total Venta</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="fechaemision"
            placeholder="FechaEmision"
            required
          />
          <label for="fechaemision">Fecha Emision</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">Crear</button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
