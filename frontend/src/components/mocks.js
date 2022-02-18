export const alertsMock = {
  total_items: 2,
  data:{
    next_page: 1,
		page: 0,
		per_page: 10,
		pre_page: -1,
		total: 100,
		total_pages: 10,
    data: [
    {
      "_index": "wazuh-alerts-4.x-sample-security",
      "_type": "_doc",
      "_id": "500",
      "_score": 1.0,
      "_source": {
        "@sampledata": true,
        "timestamp": "2020-09-14T18:30:45.569+0000",
        "rule": {
          "firedtimes": 1,
          "mail": false,
          "level": 5,
          "pci_dss": [
            "11.5"
          ],
          "hipaa": [
            "164.312.c.1",
            "164.312.c.2"
          ],
          "description": "File added to the system.",
          "groups": [
            "ossec",
            "syscheck"
          ],
          "id": "554",
          "nist_800_53": [
            "SI.7"
          ],
          "gpg13": [
            "4.11"
          ],
          "gdpr": [
            "II_5.1.f"
          ]
        },
        "agent": {
          "id": "004",
          "name": "Ubuntu",
          "ip": "47.204.15.21"
        },
        "manager": {
          "name": "wazuh-master"
        },
        "cluster": {
          "name": "wazuh"
        },
        "id": "1580123327.49031",
        "predecoder": {},
        "decoder": {},
        "data": {},
        "location": "",
        "syscheck": {
          "event": "added",
          "path": "/run/utmp",
          "uname_after": "NETWORK Service",
          "gname_after": "root",
          "mtime_after": "2020-09-14T19:40:09.863Z",
          "size_after": 18,
          "uid_after": "S-1-5-18",
          "gid_after": "190",
          "perm_after": "rw-r--r--",
          "inode_after": 41722
        }
      }
    },
    {
      "_index": "wazuh-alerts-4.x-sample-security",
      "_type": "_doc",
      "_id": "530",
      "_score": 1.0,
      "_source": {
        "@sampledata": true,
        "timestamp": "2020-09-16T02:29:46.344+0000",
        "rule": {
          "firedtimes": 2,
          "mail": false,
          "level": 7,
          "pci_dss": [
            "11.5"
          ],
          "hipaa": [
            "164.312.c.1",
            "164.312.c.2"
          ],
          "description": "Integrity checksum changed.",
          "groups": [
            "ossec",
            "syscheck"
          ],
          "id": "550",
          "nist_800_53": [
            "SI.7"
          ],
          "gpg13": [
            "4.11"
          ],
          "gdpr": [
            "II_5.1.f"
          ]
        },
        "agent": {
          "id": "007",
          "name": "Debian",
          "ip": "24.273.97.14"
        },
        "manager": {
          "name": "wazuh-master"
        },
        "cluster": {
          "name": "wazuh"
        },
        "id": "1580123327.49031",
        "predecoder": {},
        "decoder": {},
        "data": {},
        "location": "",
        "syscheck": {
          "event": "modified",
          "path": "/var/osquery/osquery.db/CURRENT",
          "uname_after": "ossec",
          "gname_after": "root",
          "mtime_after": "2020-09-16T08:26:44.884Z",
          "size_after": 60,
          "uid_after": "S-1-5-18",
          "gid_after": "190",
          "perm_after": "rw-r--r--",
          "inode_after": 65060,
          "mtime_before": "2020-09-16T08:25:44.884Z",
          "inode_before": 21266,
          "sha1_after": "27f676d71504bb7b005a0b73c735a7b381a16fd1",
          "changed_attributes": [
            "sha1"
          ],
          "md5_after": "7edd50c699ad5a9dfbe81aafabaeed27",
          "sha256_after": "ff9a6a109a9a5584752c74ecbbb82bed50231d795da85daad7782138a23e"
        }
      }
    }]
  }
}
