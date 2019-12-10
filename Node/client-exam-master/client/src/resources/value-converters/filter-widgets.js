export class FilterWidgetsValueConverter {
      toView(widgets, filterWidgets) {
        if (!widgets) return;
        if (!filterWidgets) return widgets;
         let filteredWidgets = [];
        widgets.forEach(widget => {
          if (widget.status !== 'Completed') filteredWidgets.push(widget);
        });
        return filteredWidgets;
      }
    }
    
    