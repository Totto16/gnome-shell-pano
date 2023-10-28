import { ActionRow } from '@gi-types/adw1';
import Gio from '@gi-types/gio2';
import Gtk4 from '@gi-types/gtk4';
import { ExtensionBase } from '@gnome-shell/extensions/extension';
import { registerGObjectClass } from '@pano/utils/gjs';
import { getCurrentExtensionSettings, gettext } from '@pano/utils/shell';
@registerGObjectClass
export class WatchExclusionsRow extends ActionRow {
  private settings: Gio.Settings;

  constructor(ext: ExtensionBase) {
    const _ = gettext(ext);
    super({
      title: _('Watch Exclusions'),
      subtitle: _('When enabled, Pano will not track clipboard from excluded apps'),
    });

    this.settings = getCurrentExtensionSettings(ext);

    const watchExclusionsSwitch = new Gtk4.Switch({
      active: this.settings.get_boolean('watch-exclusion-list'),
      valign: Gtk4.Align.CENTER,
      halign: Gtk4.Align.CENTER,
    });

    this.settings.bind('watch-exclusion-list', watchExclusionsSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);

    this.add_suffix(watchExclusionsSwitch);
    this.set_activatable_widget(watchExclusionsSwitch);
  }
}
