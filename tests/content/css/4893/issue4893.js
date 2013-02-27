function runTest()
{
    FBTest.sysout("issue4893.START");
    FBTest.openNewTab(basePath + "css/4893/issue4893.html", function(win)
    {
        FBTest.openFirebug();
        FBTest.selectPanel("stylesheet");

        // Catch the first page load and Style panel update.
        waitForCssRules(function()
        {
            // Reload the page.
            FBTest.reload(function()
            {
                // Catch the second style update
                waitForCssRules(function()
                {
                    FBTest.testDone("issue4893.DONE");
                });
            });
        });
    });
}

function waitForCssRules(callback)
{
    var config = {tagName: "div", classes: "cssEditableRule"};
    FBTest.waitForDisplayedElement("stylesheet", config, function(row)
    {
        var panel = FBTest.selectSidePanel("stylesheet");
        var nodes = panel.panelNode.querySelectorAll(".cssEditableRule");
        FBTest.compare(1, nodes.length, "There must be one style");

        callback();
    });
}
