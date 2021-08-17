<template>
  <div class="home-banner">
    <img src="https://pt-starimg.didistatic.com/static/starimg/img/JoUp37p0Nw1629096552596.png" alt="">
    <div class="home-banner-ufo home-banner-piece"></div>
    <div class="home-banner-logo home-banner-piece" id="logo"></div>
    <div class="home-banner-cell home-banner-piece"></div>
  </div>
</template>

<script>
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  TextureLoader,
  Mesh,
  CircleGeometry,
  TorusGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  AddOperation,
  DoubleSide,
  Group
} from 'three'

let camera, scene, renderer
let mesh

export default {
  mounted () {
    this.$nextTick(() => {
      this.init(() => {
        this.animate()
      })
    })
  },
  methods: {
    init (callback) {
      scene = new Scene()

      const container = this.$el.querySelector('#logo')
      const devicePixelRatio = window.devicePixelRatio
      const width = container.offsetWidth
      const height = width * 16 / 25

      // camera = new THREE.PerspectiveCamera(30, width/height, 1, 1000)
      camera = new OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000)
      camera.position.set(0, 0, 200)
      camera.lookAt(0,0,0)
      camera.position.multiplyScalar(2)
      camera.updateMatrixWorld()

      renderer = new WebGLRenderer({
        alpha:true
      })
      renderer.setPixelRatio(devicePixelRatio)
      renderer.setSize(width, height)
      renderer.setClearAlpha(0.0)
      renderer.shadowMap.enabled = true
      container.appendChild(renderer.domElement)

      scene.add(new AmbientLight(0xFFFFFF))

      const light = new DirectionalLight()
      light.position.set(0.5, 0.5, 1)
      light.castShadow = true
      light.shadow.camera.zoom = 4 // tighter shadow map
      scene.add(light)

      new TextureLoader().load('https://pt-starimg.didistatic.com/static/starimg/img/bX95tXjw4m1629102229443.jpg', texture => {

        const mesh0 = new Mesh(new CircleGeometry(60, 32), new MeshBasicMaterial({
          map: texture,
          opacity: 0.9
        }))
        mesh0.castShadow = true
        mesh0.receiveShadow = true
        mesh0.position.set(0, 0, 10)

        const geometryTorus = new TorusGeometry(60, 10, 16, 100)
        const mesh1 = new Mesh(geometryTorus, new MeshLambertMaterial({
          envMaps: texture,
          color: 0x76daa,
          emissive: 0x0,
          reflectivity: 0.5,
          combine: AddOperation
        }))

        const mesh2 = new Mesh(new CircleGeometry(60, 32), new MeshBasicMaterial({
          map: texture,
          opacity: 0.9,
          side: DoubleSide
        }))
        mesh2.castShadow = true
        mesh2.receiveShadow = true
        mesh2.position.set(0, 0, -10)

        mesh = new Group()
        mesh.add(mesh0)
        mesh.add(mesh1)
        mesh.add(mesh2)

        scene.add(mesh)
        callback()
      })
    },
    animate() {
      const LIMIT = 5
      let offset = this.decrease ? -1 : 1

      mesh.rotation.x += 0.004 * offset
      mesh.rotation.y += 0.001 * offset
      mesh.rotation.z += 0.002 * offset

      renderer.render(scene, camera)
      requestAnimationFrame(this.animate)

      if (mesh.rotation.x >= LIMIT && !this.decrease) {
        this.decrease = true
      } else if (mesh.rotation.x <= 0 && this.decrease) {
        this.decrease = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-banner
  position relative
  img
    width 100%
  .home-banner-piece
    position absolute
    &.home-banner-ufo
      top -15%
      left 8%
      width 40%
      padding-bottom 30%
      background url(https://pt-starimg.didistatic.com/static/starimg/img/vaNiOrU2ve1629087223959.png) center no-repeat
      background-size contain
      animation float-0 10s ease-in-out infinite alternate
    &.home-banner-cell
      bottom 0
      right 0
      width 30%
      padding-bottom 20%
      background url(https://pt-starimg.didistatic.com/static/starimg/img/agBeaQs2eO1629087464120.png) center no-repeat
      background-size contain
      animation float-1 10s ease-in-out 1s infinite alternate
    &.home-banner-logo
      top 0
      left 0
      right 0
      bottom 0
      z-index 2
      // background url(https://pt-starimg.didistatic.com/static/starimg/img/x9wyAe5Cpd1629096779682.png) center no-repeat
      // background-size contain
      // animation float-2 8s ease-in-out .5s infinite alternate

@keyframes float-0
  0%
    transform none
  33%
    transform translate(-6px,6px) rotate(-5deg) scale(0.99)
    filter invert(25%)
  50%
    transform translate(-4px,-5px) rotate(-3deg) scale(0.98)
    filter invert(50%)
  to
    transform translate(-1px,5px) rotate(0) scale(1)

@keyframes float-1
  0%
    transform none
  25%
    transform translate(5px,-8px) scale(1.05) rotate(-10deg)
  50%
    transform translate(3px) scale(1) rotate(0)
  75%
    transform translate(5px,-8px) scale(1) rotate(8deg)
  100%
    transform none

@keyframes float-2
  0%
    transform none
  33%
    transform translate(-2px,5px) rotateY(-15deg) rotateZ(-5deg)
  50%
    transform translate(2px,-5px) rotateY(0) rotateZ(0)
  to
    transform none

.dark .home-banner
  filter invert(100%)
  .home-banner-logo
    filter invert(100%)
</style>