<script setup lang="ts">
import type { Orden } from '@/models/orden'
import http from '@/plugins/axios'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps<{
    ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var ordenes = ref<Orden[]>([])

async function getOrdenes() {
    ordenes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
    router.push(`/ordenes/editar/${id}`)
}

async function toDelete(id: number) {
    var r = confirm('¿Está seguro que se desea eliminar la Venta?')
    if (r == true) {
        await http.delete(`${ENDPOINT}/${id}`).then(() => getOrdenes())
    }
}

onMounted(() => {
    getOrdenes()
})
</script>

<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Ordenes</li>
            </ol>
        </nav>

        <div class="row">
            <h2>Lista de Ordenes</h2>
            <div class="col-12">
                <RouterLink to="/ordenes/crear">Crear Nuevo</RouterLink>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">idProducto</th>
                        <th scope="col">idCliente</th>
                        <th scope="col">cantidad</th>
                        <th scope="col">totalventa</th>
                        <th scope="col">fechaemision</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(orden, index) in ordenes.values()" :key="orden.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ orden.idProducto }}</td>
                        <td>{{ orden.idCliente }}</td>
                        <td>{{ orden.cantidad }}</td>
                        <td>{{ orden.totalventa }}</td>
                        <td>{{ orden.fechaemision }}</td>
                        <td>
                            <button class="btn btn-link" @click="toEdit(orden.id)">Editar</button>
                            <button class="btn btn-link" @click="toDelete(orden.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>

