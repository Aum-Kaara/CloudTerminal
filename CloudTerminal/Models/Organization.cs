using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudSense.Models
{
    public class Organization
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string objectIdOfCloudSenseServicePrincipal { get; set; }
    }
}