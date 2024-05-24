class NoticeTab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    render() {
        const value = this.getAttribute('value');
        this.shadowRoot.innerHTML = `
            <style>
                .opened {
                    filter: invert(20%) sepia(100%) saturate(1500%) hue-rotate(250deg) brightness(100%) contrast(100%);
                    transform: rotate(90deg);
                }
                
            </style>
            <div id="main" style="display: flex;justify-content: space-between;align-items: center;margin: 0.2rem 10% 0;padding:2rem 1rem;border:1px solid rgba(0,0,0,0.2);border-top-color: transparent;border-left-color: transparent;border-right-color: transparent;">
                <div>
                    <div id="title" style="font-weight: 600;font-size: 1.2rem;">${this.title}</div>
                   <div id="desc" style="display: none;margin-top: 0.4rem;">${value}</div>
                </div>
                <div id="icon" style="min-width:2rem;min-height:2rem;border-radius: 50%;border:1px solid;display: flex;justify-content: center;">
                    <img style="width:1rem;" src="media/arrow.svg"/>
                </div>
            </div>
        `
    }

    connectedCallback() {
        this.render();

        let status = false;
        const that = this;
        const main = this.shadowRoot.getElementById("main");
        const desc = this.shadowRoot.getElementById("desc");

        this.shadowRoot.getElementById('main').addEventListener('click', click);

        function click() {
            status = !status;
            main.style.borderTopColor = status ? "rgba(0,0,0,0.2)" : "transparent";
            main.style.borderLeftColor = status ? "rgba(0,0,0,0.2)" : "transparent";
            main.style.borderRightColor = status ? "rgba(0,0,0,0.2)" : "transparent";
            main.style.borderRadius = status ? "1rem" : "0";
            main.style.boxShadow = status ? "0px 2px 5px rgba(23,26,31,0.2), 0px 0px 2px rgba(23,26,31,0.2)" : "none";
            that.shadowRoot.getElementById("title").style.color = status ? "#5113D7" : "black";
            desc.style.display = status ? "block" : "none";
            desc.style.color = status ? "#6D31ED" : "black";
            that.shadowRoot.getElementById("icon").className = status ? "opened" : "";
        }
    }
}

customElements.define('notice-component', NoticeTab);