class ProjectTab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            .clickText {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline: none;
        text-decoration: none;
        user-select: none;
        color: black;
    }

    .clickText:active {
        text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.1);
        color: #494e52;
    }

    .clickButton{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline: none;
        text-decoration: none;
        user-select: none;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }

    .clickButton:hover {
        filter: contrast(1.02);
    }

    .clickButton:active {
        filter: brightness(0.98);
        transform: scale(0.99);
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
            </style>
            <div style="position:relative;display: flex;align-items: center;justify-content: space-between;border-radius: 0.5rem;border:1px solid rgb(0,0,0,0.3);padding: 2rem;margin-bottom: 1.5rem;">
                <div style="display:flex;align-items: center;position: absolute;right: 2rem;top:2rem;"><div>${this.budget}</div><img style="margin-left: 0.2rem;height: 1rem;" src="media/star.svg"/></div>
                <div id="data-part" style="display: flex;align-items: center;">
                    <div>
                        <div onclick="window.open('${this.titleLink ? this.titleLink : this.link}','_blank')" class="clickText" style="color: #3ca0e6;font-weight: 600;padding-bottom: 0.5rem;cursor: pointer;">${this.name}</div>
                        <div id="descPlace" style="white-space:pre-wrap;padding-bottom: 0.5rem;">${this.desc}</div>
                        <div>Budget: $${this.budget}</div>
                    </div>
                </div>
                ${this.type==="admin"? '<div id="review" class="clickButton" style="width: max-content;white-space: nowrap;padding: 0.5rem 1rem;color: white;background-color: #3ca0e6;border-radius: 0.3rem;cursor: pointer;">Review</div>':`<div onclick="window.open('${this.buttonLink.replace(/\/[^\/]*$/, '')}','_blank')" class="clickButton" style="width: max-content;white-space: nowrap;padding: 0.5rem 1rem;color: white;background-color: #3ca0e6;border-radius: 0.3rem;cursor: pointer;">View Issue</div>`}
            </div>
        `
    }

    connectedCallback() {
        this.render();

        if(this.type === "admin") {
            const reviewButton = this.shadowRoot.getElementById("review")

            reviewButton.addEventListener('mousedown', () => {
                goDetail(this.id)
            })
        }

        if (this.img) {
            const imgDom = document.createElement("img");
            imgDom.src = this.img;
            imgDom.style.width = "8rem"
            imgDom.style.marginRight = "2rem"
            const dataPartDOM = this.shadowRoot.getElementById("data-part");
            dataPartDOM.insertBefore(imgDom, dataPartDOM.firstChild)
        }
        if (this.desc) {
            const contentElement = document.createElement("div");
            contentElement.innerHTML = this.desc;
            const descPlace = this.shadowRoot.getElementById("descPlace");
            const text = contentElement.textContent.trim()
            descPlace.innerText = text.substring(0, 100) + (text.length > 100 ? "..." : "");
        }
    }
}

customElements.define('project-component', ProjectTab);