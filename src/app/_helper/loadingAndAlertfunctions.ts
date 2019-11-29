import {
    AlertController,
    LoadingController
} from "@ionic/angular";

export async function show_alert(alertController: AlertController, msg) {
    let alert = await alertController.create({
        message: msg,
        buttons: ['OK']
    });
    return await alert.present();
}

export function show_loading(loadingCtrl: LoadingController, loading) {
    loading = loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'crescent',
    })
    loading.then(loading => {
        return loading.present()
    })
}