/**
 * @author Dmytro Zataidukh
 * @created_at 11/3/19
 */
import Vue from 'vue';
import {VuetifyLocale} from 'vuetify/types/services/lang';
import DialogBuilder from '@web/plugins/vuetify/dialog/builder/DialogBuilder';
import ProgressBarBuilder from '@web/plugins/vuetify/dialog/builder/ProgressBarBuilder';

declare module 'vue/types/vue' {


    interface Vue {
        $currentLang: string;
        $appProgress: {show(): void; hide(): void };

        $t(key: string, ...params: Array<string | number>): string;
        $addLocale(lang: string, translates: VuetifyLocale): void;
        $setLocale(lang: string): void;

        $vDialog(name: string): DialogBuilder;
        $vConfirmDialog(name?: string): DialogBuilder;
    }
}

