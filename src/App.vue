<template>
<q-layout view="hHh lpr fff" data-nosnippet>
    <q-header>
        <q-toolbar>
            <q-toolbar-title v-responsive.sm.md.lg.xl :shrink="true" >DXF viewer</q-toolbar-title>
            <q-file color="white" label-color="white" filled bottom-slots clearable dense
                    :value="inputFile" label="Select file or drag here" style="max-width: 300px; display: none;"
                    accept=".dxf"
                    class="q-ml-xl" dark @input="_OnFileSelected" @clear="_OnFileCleared">
                <template v-slot:before>
                    <q-icon name="folder_open" color="white" />
                </template>
                <template v-slot:hint>
                    <span class="text-white">File is processed locally in your browser</span>
                </template>
                <template v-slot:after>
                    <q-btn dense flat label="URL" @click="urlDialog = true"/>
                </template>
            </q-file>
            <q-btn @click="measurement.turnOn();" v-if="!measurement.active">
                <q-icon name="straighten" />
                <div v-responsive.md.lg.xl style="margin-left: 0.75rem">Measure distance</div>
            </q-btn>
            <div style="font-size: 1.25rem" v-if="measurement.active">
                <q-icon name="straighten" v-responsive.sm.xs />
                <span v-responsive.md.lg.xl>distance:</span>
                {{distance}}{{unit}}
                <br v-responsive.sm.xs />
                <span v-if="area > 0">
                    <span v-responsive.sm.xs> S:</span>
                    <span v-responsive.md.lg.xl>, area:</span>
                    {{area}}{{unit}}<sup>2</sup>
                </span>
            </div>
            <q-btn class="q-ml-lg" @click="measurement.turnOff();" v-if="measurement.active">
                <q-icon name="close" />
                <div v-responsive.md.lg.xl style="margin-left: 0.75rem">Clear</div>
            </q-btn>
            <q-space />
            <q-toggle
                v-model="showLayers"
                icon="layers"
                color="green"
            />
            <q-btn v-responsive.lg.xl icon="help" label="About" class="q-ml-lg" @click="aboutDialog = true"></q-btn>
            <q-btn icon="fab fa-github" color="primary" label="dxf-viewer on GitHub" no-caps
                   class="q-mx-sm github" type="a"
                   href="https://github.com/vagran/dxf-viewer"
                   style="display: none;"
                   />
            <q-btn icon="fab fa-github" color="primary" label="This example on GitHub" no-caps
                   class="q-mx-sm github" type="a"
                   href="https://github.com/vagran/dxf-viewer-example-src"
                   style="display: none;"
                   />
        </q-toolbar>
    </q-header>
    <q-page-container>
        <ViewerPage ref="viewerPage" :dxfUrl="dxfUrl" :showLayers="showLayers">
            <div v-if="inputFile === null"
                 class="centralUploader row justify-center items-center" >
                <div class="col-auto" style="width: 300px;">
                    <q-file filled bottom-slots clearable
                            :value="inputFile" label="Select file or drag here"
                            accept=".dxf"
                            class="col" @input="_OnFileSelected" @clear="_OnFileCleared">
                        <template v-slot:before>
                            <q-icon name="folder_open" size="xl" />
                        </template>
                        <template v-slot:hint>
                            <span>File is processed locally in your browser</span>
                        </template>
                    </q-file>
                </div>
                <div class="col-auto q-mx-lg q-pb-lg">
                    <q-btn label="Load URL" @click="urlDialog = true" style="display: none;"/>
                </div>
            </div>
        </ViewerPage>
    </q-page-container>

    <q-dialog v-model="aboutDialog">
        <q-card>
            <q-card-section class="row items-center q-pb-sm">
                <div class="text-h6">About</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-separator />
            <q-card-section style="max-height: 50vh" class="scroll" v-html="aboutHtml" />
        </q-card>
    </q-dialog>

    <q-dialog v-model="urlDialog">
        <q-card>
            <q-card-section class="row items-center q-pb-sm">
                <div class="text-h6">Load URL</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="q-mb-lg">
                    <a href="https://startpage.com/sp/search?q=SECTION%20HEADER%20filetype:dxf"
                       target="_blank">Find some examples</a>
                </div>
                <q-form @submit="_OnUrl" class="q-gutter-md" style="width: 400px;">
                    <q-input filled v-model="inputUrl" label="Input URL here" bottom-slots>
                      <template v-slot:hint>
                        <span>Uses <a href="https://allorigins.win">AllOrigins</a> CORS proxy</span>
                      </template>
                    </q-input>
                    <div>
                        <q-btn label="Submit" type="submit" color="primary" v-close-popup />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</q-layout>
</template>
<script>
import ViewerPage from "@/components/ViewerPage"
import Measurement from "./Measurement"

export default {
    components: {ViewerPage},

    data() {
        return {
            dxfUrl: null,
            inputFile: null,
            isLocalFile: false,
            aboutDialog: false,
            urlDialog: false,
            inputUrl: null,
            showLayers: true,
            distance: 0,
            area: 0,
            unit: "m",
            measurement: {
                active: false
            }
        }
    },

    methods: {
        _OnFileSelected(file) {
            if (!file) {
                this._OnFileCleared()
                return
            }
            if (this.dxfUrl && this.isLocalFile) {
                URL.revokeObjectURL(this.dxfUrl)
            }
            this.isLocalFile = true
            this.inputFile = file
            this.dxfUrl = URL.createObjectURL(file)
            this.fetchConfig(`./dxf/default-config.json`)
        },

        _OnFileCleared() {
            if (this.inputFile) {
                this.inputFile = null
                URL.revokeObjectURL(this.dxfUrl)
                this.dxfUrl = null
                this.$q.notify({
                    type: "info",
                    message: "File cleared"
                })
            }
        },

        _OnUrl() {
            if (this.inputUrl === null) {
                return
            }
            const url = this.inputUrl.trim()
            if (url === "") {
                return
            }
            if (this.dxfUrl && this.isLocalFile) {
                URL.revokeObjectURL(this.dxfUrl)
            }
            this.isLocalFile = false
            this.inputFile = new File(["remote_file"], url, { type: "text/plain" })
            this.dxfUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url)
        },

        fetchConfig(filename) {
            return fetch(filename)
                .then(res => res.json())
                .then((config) => {
                    const {unit, distancePrecision, areaPrecision} = config
                    const scale = config.relativeToDrawingUnit
                    this.unit = unit
                    const viewer = this.$refs.viewerPage.$refs.viewer.GetViewer()
                    this.measurement = new Measurement(viewer)
                    this.measurement.subscribe(({distance, area}) => {
                        this.distance = (distance / scale).toFixed(distancePrecision)
                        this.area = (area / scale / scale).toFixed(areaPrecision)
                    })
                })
        }
    },

    created() {
        const aboutBlock = document.getElementById("about")
        this.aboutHtml = aboutBlock.innerHTML
        aboutBlock.style.display = "none"
        this.showLayers = window.innerWidth > 720;
        /* For web crawler. */
        document.getElementById("noscript").innerText = aboutBlock.innerText
    },

    mounted() {
        /* load file from query param */
        const params = new URLSearchParams(window.location.search)
        const file = params.get('file')
        if(!file) return;
        const filename = `./dxf/${file}.dxf`
        fetch(filename)
            .then(res => res.text())
            .then(data => {
                const file = new File([data], filename, { type: "text/plain" })
                this.inputFile = file
                this.isLocalFile = true
                this.dxfUrl = URL.createObjectURL(file)
            })
            .catch(console.error)
        fetch(`./dxf/${file}.json`, { method: "HEAD" })
            .then(res => res.ok
                ? this.fetchConfig(`./dxf/${file}.json`)
                : Promise.reject()
            )
            .catch(() => this.fetchConfig(`./dxf/default-config.json`))
    },

    destroyed() {
        if (this.dxfUrl) {
            URL.revokeObjectURL(this.dxfUrl)
        }
    }
}
</script>

<style scoped lang="less">

a.github:hover {
    text-decoration: none;
}

.centralUploader {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
}

</style>