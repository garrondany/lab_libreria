<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
const id = router.currentRoute.value.params['id']

async function editarOrden() {
    await http
        .patch(`${ENDPOINT}/${id}`, {
            idProducto: idProducto.value,
            idCliente: idCliente.value,
            cantidad: cantidad.value,
            totalventa: totalventa.value,
            fechaemision: fechaemision.value,
        })
        .then(() => router.push('/ordenes'))
}

async function getOrden() {
    await http.get(`${ENDPOINT}/${id}`).then((response) => {
        ; (idProducto.value = response.data.idProducto), (idCliente.value = response.data.idCliente), (cantidad.value = response.data.cantidad), (totalventa.value = response.data.totalventa), (fechaemision.value = response.data.fechaemision)
    })
}

function goBack() {
    router.go(-1)
}

onMounted(() => {
    getOrden()
})
</script>

<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/ordenes">Ordenes</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Editar</li>
            </ol>
        </nav>

        <div class="row">
            <h2>Editar Ordenes</h2>
        </div>

        <div class="row">
            <form @submit.prevent="editarOrden">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" v-model="idProducto" placeholder="IdProducto" required />
                    <label for="nombre">Id Producto</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" v-model="idCliente" placeholder="IdCliente" required />
                    <label for="nombre">Id Cliente</label>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" v-model="cantidad" placeholder="Cantidad" required />
                    <label for="cantidad">Cantidad</label>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" v-model="totalventa" placeholder="TotalVenta" required />
                    <label for="totalventa">Total Venta</label>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" v-model="fechaemision" placeholder="FechaEmision" required />
                    <label for="fechaemision">Fecha Emision</label>
                </div>

                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-primary btn-lg">Guardar</button>
                </div>
            </form>
        </div>
        <div class="text-left">
            <button class="btn btn-link" @click="goBack">Volver</button>
        </div>
    </div>
</template>


<style></style>

