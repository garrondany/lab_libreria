<script setup lang="ts">
import type { Libro } from '@/models/libro'
import http from '@/plugins/axios'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps<{
    ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var libros = ref<Libro[]>([])

async function getLibros() {
    libros.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
    router.push(`/libros/editar/${id}`)
}

async function toDelete(id: number) {
    var r = confirm('¿Está seguro que se desea eliminar el Libro?')
    if (r == true) {
        await http.delete(`${ENDPOINT}/${id}`).then(() => getLibros())
    }
}

onMounted(() => {
    getLibros()
})
</script>

<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Libros</li>
            </ol>
        </nav>

        <div class="row">
            <h2>Lista de Libros</h2>
            <div class="col-12">
                <RouterLink to="/libros/crear">Crear Nuevo</RouterLink>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Precio</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(libro, index) in libros.values()" :key="libro.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ libro.titulo }}</td>
                        <td>{{ libro.autor }}</td>
                        <td>{{ libro.stock }}</td>
                        <td>{{ libro.precio }}</td>
                        <td>
                            <button class="btn btn-link" @click="toEdit(libro.id)">Editar</button>
                            <button class="btn btn-link" @click="toDelete(libro.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>

