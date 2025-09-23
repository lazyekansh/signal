#!/usr/bin/perl
# NewsHub Pro - Log Parser Utility
# Simple Perl script for parsing application logs and counting API calls

use strict;
use warnings;
use Getopt::Long;

# Default configuration
my $log_file = "access.log";
my $help = 0;
my $api_stats = 0;
my $verbose = 0;

# Parse command line options
GetOptions(
    'file=s'     => \$log_file,
    'api-stats'  => \$api_stats,
    'verbose'    => \$verbose,
    'help'       => \$help
) or die("Error in command line arguments\n");

# Show help
if ($help) {
    print_help();
    exit 0;
}

print "📊 NewsHub Pro - Log Parser\n";
print "==========================\n\n";

# Check if log file exists
unless (-e $log_file) {
    print "❌ Log file '$log_file' not found.\n";
    print "Creating sample log file for demonstration...\n\n";
    create_sample_log($log_file);
}

# Parse log file
parse_log_file($log_file);

sub print_help {
    print qq{
📰 NewsHub Pro - Log Parser Utility

USAGE:
    perl log-parser.pl [OPTIONS]

OPTIONS:
    --file=FILE     Specify log file (default: access.log)
    --api-stats     Show detailed API statistics
    --verbose       Show verbose output
    --help          Show this help message

EXAMPLES:
    perl log-parser.pl
    perl log-parser.pl --file=server.log --api-stats
    perl log-parser.pl --verbose

DESCRIPTION:
    This utility parses web server logs and provides statistics
    about API calls, popular endpoints, and error rates.
    Perfect for monitoring your NewsHub Pro application.
};
}

sub create_sample_log {
    my ($filename) = @_;
    
    open(my $fh, '>', $filename) or die "Cannot create $filename: $!";
    
    my @sample_logs = (
        '127.0.0.1 - - [23/Sep/2024:10:30:45 +0000] "GET /api/news/top-headlines HTTP/1.1" 200 2458',
        '127.0.0.1 - - [23/Sep/2024:10:31:12 +0000] "GET /api/news/search?q=technology HTTP/1.1" 200 3142',
        '192.168.1.100 - - [23/Sep/2024:10:32:03 +0000] "GET /api/news/categories HTTP/1.1" 200 567',
        '10.0.0.15 - - [23/Sep/2024:10:33:21 +0000] "GET /api/news/top-headlines?category=business HTTP/1.1" 200 1987',
        '127.0.0.1 - - [23/Sep/2024:10:34:45 +0000] "POST /api/bookmarks HTTP/1.1" 201 89',
        '192.168.1.50 - - [23/Sep/2024:10:35:12 +0000] "GET /api/news/search?q=climate HTTP/1.1" 200 2756',
        '127.0.0.1 - - [23/Sep/2024:10:36:33 +0000] "DELETE /api/bookmarks/123 HTTP/1.1" 204 0',
        '10.0.0.22 - - [23/Sep/2024:10:37:44 +0000] "GET /api/news/top-headlines HTTP/1.1" 500 245',
        '192.168.1.75 - - [23/Sep/2024:10:38:15 +0000] "GET /static/css/main.css HTTP/1.1" 200 45678',
        '127.0.0.1 - - [23/Sep/2024:10:39:28 +0000] "GET /api/news/search?q=sports HTTP/1.1" 200 3890'
    );
    
    foreach my $log (@sample_logs) {
        print $fh "$log\n";
    }
    
    close($fh);
    print "✅ Sample log file created: $filename\n\n";
}

sub parse_log_file {
    my ($filename) = @_;
    
    open(my $fh, '<', $filename) or die "Cannot open $filename: $!";
    
    my %stats = (
        total_requests => 0,
        api_calls => 0,
        status_codes => {},
        endpoints => {},
        ips => {},
        methods => {}
    );
    
    print "🔍 Parsing log file: $filename\n";
    print "=" x 40 . "\n\n";
    
    while (my $line = <$fh>) {
        chomp $line;
        
        # Parse common log format
        if ($line =~ /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+) \S+" (\d+) (\d+)/) {
            my ($ip, $timestamp, $method, $path, $status, $size) = ($1, $2, $3, $4, $5, $6);
            
            $stats{total_requests}++;
            $stats{status_codes}{$status}++;
            $stats{methods}{$method}++;
            $stats{ips}{$ip}++;
            
            # Count API calls
            if ($path =~ /^\/api\//) {
                $stats{api_calls}++;
                $stats{endpoints}{$path}++;
                
                if ($verbose) {
                    print "API Call: $method $path -> $status\n";
                }
            }
        }
    }
    
    close($fh);
    
    # Print statistics
    print_statistics(\%stats);
}

sub print_statistics {
    my ($stats_ref) = @_;
    my %stats = %$stats_ref;
    
    print "📈 SUMMARY STATISTICS\n";
    print "=" x 30 . "\n";
    printf "Total Requests: %d\n", $stats{total_requests};
    printf "API Calls: %d (%.1f%%)\n", 
           $stats{api_calls}, 
           $stats{total_requests} > 0 ? ($stats{api_calls} / $stats{total_requests}) * 100 : 0;
    print "\n";
    
    # Status codes
    print "📊 STATUS CODES\n";
    print "-" x 20 . "\n";
    foreach my $status (sort keys %{$stats{status_codes}}) {
        printf "%s: %d requests\n", $status, $stats{status_codes}{$status};
    }
    print "\n";
    
    # HTTP methods
    print "🔧 HTTP METHODS\n";
    print "-" x 20 . "\n";
    foreach my $method (sort keys %{$stats{methods}}) {
        printf "%s: %d requests\n", $method, $stats{methods}{$method};
    }
    print "\n";
    
    # Top IP addresses
    print "🌐 TOP IP ADDRESSES\n";
    print "-" x 20 . "\n";
    my @sorted_ips = sort { $stats{ips}{$b} <=> $stats{ips}{$a} } keys %{$stats{ips}};
    foreach my $ip (@sorted_ips[0..4]) {  # Top 5
        last unless defined $ip;
        printf "%s: %d requests\n", $ip, $stats{ips}{$ip};
    }
    print "\n";
    
    # API endpoints (if requested)
    if ($api_stats && %{$stats{endpoints}}) {
        print "🔗 API ENDPOINTS\n";
        print "-" x 20 . "\n";
        my @sorted_endpoints = sort { $stats{endpoints}{$b} <=> $stats{endpoints}{$a} } keys %{$stats{endpoints}};
        foreach my $endpoint (@sorted_endpoints) {
            printf "%s: %d calls\n", $endpoint, $stats{endpoints}{$endpoint};
        }
        print "\n";
    }
    
    print "✅ Log analysis complete!\n";
}

# Run the script
print "Starting log analysis...\n\n" if $verbose;