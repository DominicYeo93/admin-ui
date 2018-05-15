
function BuildpacksTab(id)
{
    Tab.call(this, id, Constants.FILENAME__BUILDPACKS, Constants.URL__BUILDPACKS_VIEW_MODEL);
}

BuildpacksTab.prototype = new Tab();

BuildpacksTab.prototype.constructor = BuildpacksTab;

BuildpacksTab.prototype.getInitialSort = function()
{
    return [[1, "asc"], [2, "asc"]];
};

BuildpacksTab.prototype.getColumns = function()
{
    return [
               {
                   title:     Tab.prototype.formatCheckboxHeader(this.id),
                   type:      "html",
                   width:     "2px",
                   orderable: false,
                   render:    $.proxy(function(value, type, item)
                                      {
                                          return this.formatCheckbox(this.id, item[2], value);
                                      },
                                      this)
               },
               {
                   title:  "Stack",
                   width:  "200px",
                   render: Format.formatStackName
               },
               {
                   title:  "Name",
                   width:  "200px",
                   render: Format.formatBuildpackName
               },
               {
                   title:  "GUID",
                   width:  "200px",
                   render: Format.formatString
               },
               {
                   title:  "Created",
                   width:  "180px",
                   render: Format.formatString
               },
               {
                   title:  "Updated",
                   width:  "180px",
                   render: Format.formatString
               },
               {
                   title:     "Position",
                   width:     "70px",
                   className: "cellRightAlign",
                   render:    Format.formatNumber
               },
               {
                   title:  "Enabled",
                   width:  "10px",
                   render: Format.formatBoolean
               },
               {
                   title:  "Locked",
                   width:  "10px",
                   render: Format.formatBoolean
               },
               {
                   title:     "Applications",
                   width:     "70px",
                   className: "cellRightAlign",
                   render:    Format.formatNumber
               }
           ];
};

BuildpacksTab.prototype.getActions = function()
{
    return [
               {
                   text:  "Rename",
                   click: $.proxy(function()
                                  {
                                      this.renameSingleChecked(this.id,
                                                               "Rename Buildpack",
                                                               "Managing Buildpacks",
                                                               Constants.URL__BUILDPACKS);
                                  },
                                  this)
               },
               {
                   text:  "Enable",
                   click: $.proxy(function()
                                  {
                                      this.updateChecked(this.id,
                                                         "Managing Buildpacks",
                                                         Constants.URL__BUILDPACKS,
                                                         "",
                                                         '{"enabled":true}');
                                  },
                                  this)
               },
               {
                   text:  "Disable",
                   click: $.proxy(function()
                                  {
                                      this.updateChecked(this.id,
                                                         "Managing Buildpacks",
                                                         Constants.URL__BUILDPACKS,
                                                         "",
                                                         '{"enabled":false}');
                                  },
                                  this)
               },
               {
                   text:  "Lock",
                   click: $.proxy(function()
                                  {
                                      this.updateChecked(this.id,
                                                         "Managing Buildpacks",
                                                         Constants.URL__BUILDPACKS,
                                                         "",
                                                         '{"locked":true}');
                                  },
                                  this)
               },
               {
                   text:  "Unlock",
                   click: $.proxy(function()
                                  {
                                      this.updateChecked(this.id,
                                                         "Managing Buildpacks",
                                                         Constants.URL__BUILDPACKS,
                                                         "",
                                                         '{"locked":false}');
                                  },
                                  this)
               },
               {
                   text:  "Delete",
                   click: $.proxy(function()
                                  {
                                      this.deleteChecked(this.id,
                                                         "Are you sure you want to delete the selected buildpacks?",
                                                         "Delete",
                                                         "Deleting Buildpacks",
                                                         Constants.URL__BUILDPACKS,
                                                         "");
                                  },
                                  this)
               }
           ];
};

BuildpacksTab.prototype.clickHandler = function()
{
    this.itemClicked(-1, 3);
};

BuildpacksTab.prototype.showDetails = function(table, objects, row)
{
    var buildpack = objects.buildpack;
    var stack     = objects.stack;

    var first = true;

    if (stack != null)
    {
        this.addFilterRow(table, "Stack", Format.formatStringCleansed(stack.name), stack.guid, AdminUI.showStacks, true);
        this.addPropertyRow(table, "Stack GUID", Format.formatString(stack.guid));

        first = false;
    }

    this.addJSONDetailsLinkRow(table, "Name", Format.formatString(buildpack.name), objects, first);
    this.addPropertyRow(table, "GUID", Format.formatString(buildpack.guid));
    this.addPropertyRow(table, "Created", Format.formatDateString(buildpack.created_at));
    this.addRowIfValue(this.addPropertyRow, table, "Updated", Format.formatDateString, buildpack.updated_at);

    // Initially used priority, then renamed to position
    this.addRowIfValue(this.addPropertyRow, table, "Priority", Format.formatNumber, buildpack.priority);
    this.addRowIfValue(this.addPropertyRow, table, "Position", Format.formatNumber, buildpack.position);

    this.addRowIfValue(this.addPropertyRow, table, "Enabled", Format.formatBoolean, buildpack.enabled);
    this.addRowIfValue(this.addPropertyRow, table, "Locked", Format.formatBoolean, buildpack.locked);
    this.addRowIfValue(this.addPropertyRow, table, "Key", Format.formatString, buildpack.key);
    this.addRowIfValue(this.addPropertyRow, table, "Filename", Format.formatString, buildpack.filename);
    this.addFilterRowIfValue(table, "Applications", Format.formatNumber, row[9], buildpack.guid, AdminUI.showApplications);
};
