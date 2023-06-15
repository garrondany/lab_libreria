<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const titulo = ref('')
const autor = ref('')
const stock = ref('')
const precio = ref('')
const id = router.currentRoute.value.params['id']

async function editarLibro() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      titulo: titulo.value,
      autor: autor.value,
      stock: stock.value,
      precio: precio.value,
    })
    .then(() => router.push('/libros'))
}

async function getLibro() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(titulo.value = response.data.nombre), (autor.value = response.data.autor), (stock.value = response.data.stock), (precio.value = response.data.precio)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getLibro()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/clientes">Libros</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Libro</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarLibro">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="titulo" placeholder="Titulo" required />
          <label for="titulo">Titulo</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="autor"
            placeholder="Autor"
            required
          />
          <label for="autor">Autor</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="stock"
            placeholder="Stock"
            required
          />
          <label for="stock">Stock</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            v-model="precio"
            placeholder="Precio"
            required
          />
          <label for="precio">Precio</label>
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

