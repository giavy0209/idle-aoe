const axios = require('axios')
const fs = require('fs')
const deletefile = async () => {
    console.log('Start delete');
    let list = await axios.get('https://sg.storage.bunnycdn.com/idle-aoe/', {
        headers: {
            AccessKey: '08faecf9-e1ff-40dd-ad8ce4ea4ee2-707e-4dd2'
        }
    })
    const listfile = list.data
    for (let index = 0; index < listfile.length; index++) {
        
        const item = listfile[index];
        await axios.delete(`https://sg.storage.bunnycdn.com/idle-aoe/${item.ObjectName}${item.IsDirectory ? '/' : ''}`, {
            headers: {
                AccessKey: '08faecf9-e1ff-40dd-ad8ce4ea4ee2-707e-4dd2'
            }
        })
    }
    console.log('deleted');
}
async function main() {
    try {
        console.log('Start deloy');

        await deletefile()
        const files = fs.readdirSync('./build')
        for (let index = 0; index < files.length; index++) {
            let filename = files[index];
            if (filename === 'static') continue
            const file = fs.readFileSync(`./build/${filename}`)
            await axios.put(`https://sg.storage.bunnycdn.com/idle-aoe/${filename}`, file, {
                headers: {
                    AccessKey: '08faecf9-e1ff-40dd-ad8ce4ea4ee2-707e-4dd2'
                }
            })
        }
        const css = fs.readdirSync('./build/static/css')
        const js = fs.readdirSync('./build/static/js')
        const media = fs.readdirSync('./build/static/media')
        for (let index = 0; index < css.length; index++) {
            const _css = css[index];
            const file = fs.readFileSync(`./build/static/css/${_css}`)
            await axios.put(`https://sg.storage.bunnycdn.com/idle-aoe/static/css/${_css}`, file, {
                headers: {
                    AccessKey: '08faecf9-e1ff-40dd-ad8ce4ea4ee2-707e-4dd2'
                }
            })
        }
        for (let index = 0; index < js.length; index++) {
            const _js = js[index];
            const file = fs.readFileSync(`./build/static/js/${_js}`)
            await axios.put(`https://sg.storage.bunnycdn.com/idle-aoe/static/js/${_js}`, file, {
                headers: {
                    AccessKey: '08faecf9-e1ff-40dd-ad8ce4ea4ee2-707e-4dd2'
                }
            })
        }
        for (let index = 0; index < media.length; index++) {
            const _media = media[index];
            const file = fs.readFileSync(`./build/static/media/${_media}`)
            await axios.put(`https://sg.storage.bunnycdn.com/idle-aoe/static/media/${_media}`, file, {
                headers: {
                    AccessKey: '08faecf9-e1ff-40dd-ad8ce4ea4ee2-707e-4dd2'
                }
            })
        }

        const res = await axios.get(`https://panel.bunny.net/api/pullzone/purgeCache?id=623232`, {
            headers: {
                AccessKey: '24e58f75-bc6d-48f8-b274-f2ac04448c572de28301-bd72-4bee-bf94-f210a041d440'
            }
        })
        console.log('deloydone');

    } catch (error) {
        console.log(error);
    }
}

main()