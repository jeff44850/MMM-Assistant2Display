class Display extends DisplayClass {
  constructor (Config, callback) {
    super(Config, callback)
    console.log("[A2D] Extends Display with Classic2 ui Loaded")
  }

  prepare() {
    var dom = document.createElement("div")
    dom.id = "A2D"
    dom.classList.add("hidden")

    var scoutpan = document.createElement("div")
    scoutpan.id = "A2D_WINDOW"
    var scoutphoto = document.createElement("img")
    scoutphoto.id = "A2D_PHOTO"
    scoutphoto.classList.add("hidden") 
    var scout = document.createElement("webview")
    scout.useragent= "Mozilla/5.0 (SMART-TV; Linux; Tizen 2.4.0) AppleWebkit/538.1 (KHTML, like Gecko) SamsungBrowser/1.1 TV Safari/538.1"
    scout.id = "A2D_OUTPUT"
    scout.scrolling="no"
    scout.classList.add("hidden")
    var scoutyt = document.createElement("div")
    scoutyt.id = "A2D_YOUTUBE"
    scoutyt.classList.add("hidden")
    var api = document.createElement("script")
    api.src = "https://www.youtube.com/iframe_api"
    var writeScript = document.getElementsByTagName("script")[0]
    writeScript.parentNode.insertBefore(api, writeScript)
    window.onYouTubeIframeAPIReady = () => {
      this.player = new YOUTUBE(
        "A2D_YOUTUBE",
        (status) => {
          this.A2D.youtube.displayed = status
          this.showYT()
        },
        (title) => {
          this.A2D.youtube.title = title
          this.titleYT()
        },
        (ended) => {
          this.A2DUnlock()
          this.resetYT()
        }
      )
      this.player.init()
    }
    scoutpan.appendChild(scoutyt)
    scoutpan.appendChild(scoutphoto)
    scoutpan.appendChild(scout)

    var contener = document.createElement("div")
    contener.id = "A2D_CONTENER"

    var contener2 = document.createElement("div")
    contener2.id = "A2D_CONTENER2"   

    var logo = document.createElement("div")
    logo.id = "A2D_LOGO"

    contener2.appendChild(logo)
    var transcription = document.createElement("div")
    transcription.id = "A2D_TRANSCRIPTION"
    contener2.appendChild(transcription)

    var help = document.createElement("div")
    help.id = "A2D_HELP"

    var helpbox = document.createElement("div")
    helpbox.id = "A2D_HELPBOX"
    help.appendChild(helpbox)

    var trysay = document.createElement("div")
    trysay.id = "A2D_TRYSAY"
    helpbox.appendChild(trysay)

    var wordbox = document.createElement("div")
    wordbox.id = "A2D_WORDBOX"
    helpbox.appendChild(wordbox)

    contener2.appendChild(help)
    contener.appendChild(contener2)

    scoutpan.appendChild(contener)
    dom.appendChild(scoutpan)

    document.body.appendChild(dom)
    super.prepare()
    return dom
  }

  prepareDisplay() {
    A2D("Prepare Display with:", this.A2D.AMk2)
    var iframe = document.getElementById("A2D_OUTPUT")
    var tr = document.getElementById("A2D_TRANSCRIPTION")
    tr.innerHTML = ""
    var t = document.createElement("p")
    t.className = "transcription"
    t.innerHTML = this.A2D.AMk2.transcription
    tr.appendChild(t)
    var wordbox = document.getElementById("A2D_WORDBOX")
    var trysay = document.getElementById("A2D_TRYSAY")
    trysay.textContent = ""
    wordbox.innerHTML = ""
    if(this.A2D.AMk2.trysay) {
      trysay.textContent = this.A2D.AMk2.trysay
      var word = []
      for (let [item, value] of Object.entries(this.A2D.AMk2.help)) {
        word[item] = document.createElement("div")
        word[item].id = "A2D_WORD"
        word[item].textContent = value
        word[item].addEventListener("click", ()=> {
          log("Clicked", value)
          this.resetLinks()
          this.hideDisplay()
          iframe.src = "http://localhost:8080/activatebytext/?query=" + value
        })
        wordbox.appendChild(word[item])
      }
    }
    A2D("Prepare ok")
    super.prepareDisplay()
  }
}
