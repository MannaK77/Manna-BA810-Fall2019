export class FilterVendorsValueConverter {
    toView(vendors, nofilterVendors) {
        if (!vendors) return;
        if (!nofilterVendors) return vendors;
        let filteredVendors = [];
        vendors.forEach(vendor => {
            if (vendor.status !== 'UnAvailable') filteredVendors.push(vendor);
        });
        return filteredVendors;
    }
}
